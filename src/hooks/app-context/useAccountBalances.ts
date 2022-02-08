import { AppContext } from 'context/AppContext';
import { useDebouncedEffect } from 'hooks/useDebounceEffect';
import { useIsMounted } from 'hooks/useIsMounted';
import { useCallback, useContext, useRef } from 'react';
import { getAllBalances } from 'utils/interactions/price';
import Logger from 'utils/Logger';
import { getNetworkIds } from 'utils/network-utils';

const interval = 180 * 1000; // 60 seconds

export function useAccountBalances(owner: string) {
  const { isTestnet } = useContext(AppContext);
  const isMounted = useIsMounted();
  owner = owner?.toLowerCase();
  const { setBalances } = useContext(AppContext);

  const intervalRef = useRef<NodeJS.Timeout>();

  const execute = useCallback(async () => {
    if (!owner) {
      return;
    }
    try {
      const chainIds = getNetworkIds(isTestnet);
      for (const chainId of chainIds) {
        await getAllBalances(chainId, owner)
          .then(response => {
            if (isMounted()) {
              setBalances(chainId, owner, response);
            }
          })
          .catch(e => Logger.error(e, 'getAllBalances'));
      }
    } catch (e) {
      Logger.error(e, 'useAccountBalances');
    }
  }, [owner, isTestnet, isMounted, setBalances]);

  const executeInterval = useCallback(async () => {
    await execute();
    intervalRef.current = setTimeout(executeInterval, interval);
  }, [execute]);

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
    execute,
  };
}
