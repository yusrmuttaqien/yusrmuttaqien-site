const ID_MEDIA_QUERY = 'media-query';

export const useMediaQuery = (query: string) => {
  const sequence = useWaitSequence(ID_MEDIA_QUERY);
  const isExecuted = ref(false);
  const isClient = ref(false);
  const matches = ref<null | boolean>(null);

  watch(
    () => ({ ready: isClient.value, query, executed: isExecuted.value }),
    (newState, _2, invalidate) => {
      if (!newState.ready) return;

      const media = window.matchMedia(newState.query);

      function _onChange() {
        matches.value = media.matches;
      }

      if (media.matches !== matches.value) {
        _onChange();

        if (!newState.executed) {
          isExecuted.value = true;
        }
      }

      media.addEventListener('change', _onChange);

      invalidate(() => {
        media.removeEventListener('change', _onChange);
      });
    }
  );
  watch(
    () => ({ ready: isClient.value, id: sequence.currentID.value, executed: isExecuted.value }),
    (newState) => {
      if (newState.ready && newState.id && newState.executed) {
        sequence.updateSequence(newState.id, true);
      }
    }
  );

  onMounted(() => {
    isClient.value = true;
  });

  return matches;
};
