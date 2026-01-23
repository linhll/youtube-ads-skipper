declare namespace chrome {
  namespace events {
    interface Event<T> {
      addListener(listener: (event: T) => void): void;
      removeListener(listener: (event: T) => void): void;
    }
  }

  namespace storage {
    interface StorageArea {
      get(keys: string | string[], callback: (result: any) => void): void;
      set(keys: Record<string, any>, callback?: (result: any) => void): void;
      remove(keys: string | string[], callback?: (result: any) => void): void;
      clear(callback?: (result: any) => void): void;
    }

    const local: StorageArea;
    const sync: StorageArea;
    const session: StorageArea;

    const onChanged: chrome.events.Event<{
      key?: string | null;
      oldValue?: string | null;
      newValue?: string | null;
    }>;
  }

  namespace runtime {
    function sendMessage(
      message: any,
      callback?: (response: any) => void
    ): void;

    const onMessage: chrome.events.Event<any>;
  }
}
