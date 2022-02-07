import { AppContext } from 'context/AppContext';
import { priceFeeds } from 'controllers/price-feeds';
import { useDebouncedEffect } from 'hooks/useDebounceEffect';
import { useIsMounted } from 'hooks/useIsMounted';
import { useCallback, useContext, useRef, useState } from 'react';
import { ChainId } from 'types/network';
import { TokenId } from 'types/token';
import { getCachedPrices } from 'utils/interactions/price';
import Logger from 'utils/Logger';
import { tokenUtils } from 'utils/token-utils';

const interval = 60 * 1000; // 60 seconds

export function useGlobalUsdPrices(chainId: ChainId, tokenId: TokenId) {
  const isMounted = useIsMounted();
  const { prices, setPrices } = useContext(AppContext);
  const [value, setValue] = useState(
    prices[chainId] || getCachedPrices(chainId, tokenId),
  );
  const intervalRef = useRef<NodeJS.Timeout>();

  const execute = useCallback(async () => {
    try {
      await priceFeeds.getAll(chainId).then(() => {
        const response = tokenUtils
          .listTokensForChainId(chainId)
          .reduce((p, c) => {
            const price = priceFeeds.get(chainId, c.id as TokenId);
            if (price !== undefined) {
              p[c.id as TokenId] = price;
            }
            return p;
          }, {} as Record<TokenId, string>);

        if (isMounted()) {
          setPrices(chainId, response);
          setValue(response);
        }
      });
    } catch (e) {
      Logger.error(e, 'useGlobalUsdPrices');
    }
  }, [chainId, setPrices, isMounted]);

  const executeInterval = useCallback(async () => {
    if ([30, 31].includes(chainId)) {
      await execute();
      intervalRef.current = setTimeout(executeInterval, interval);
    }
  }, [execute, chainId]);

  useDebouncedEffect(
    () => {
      executeInterval();
      return () => {
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }
      };
    },
    300,
    [executeInterval],
  );

  return {
    value,
    execute,
  };
}
