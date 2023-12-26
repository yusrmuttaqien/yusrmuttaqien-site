export const useWaitSequence = (id?: string) => {
  const currentID = ref<string | null>(null);
  const states = useWaitList();
  const isSequenceComplete = computed(() => {
    const sequencesStatus = Object.values(states.value);

    if (sequencesStatus.length === 0) return false;

    return sequencesStatus.every((state) => state);
  });

  function _updateSequence(id: string, state: boolean) {
    states.value[id] = state;
  }

  function _setSequence(id: string) {
    currentID.value = id;
    _updateSequence(id, false);
  }

  function _cleanupSequence() {
    states.value = {};
  }

  watchEffect(() => {
    if (currentID.value || !id) return;

    const isExist = !!states.value[id];

    if (!isExist) {
      _setSequence(id);
    } else {
      const lastID = Object.keys(states.value).findLast((existingId) =>
        existingId.includes(id)
      ) as string;
      const newLevel = parseInt(lastID.split(id)[1] || '0');
      const newID = id + (newLevel + 1).toString();

      _setSequence(newID);
    }
  });

  return {
    updateSequence: _updateSequence,
    cleanupSequence: _cleanupSequence,
    isSequenceComplete: isSequenceComplete,
    currentID: currentID,
  };
};
