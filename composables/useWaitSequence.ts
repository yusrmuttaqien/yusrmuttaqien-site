export const useWaitSequence = (id?: string, withDisable?: boolean) => {
  const currentID = ref<string | null>(null);
  const states = useWaitList();
  const config = useSequenceConfig();
  const isSequenceComplete = computed(() => {
    if (!config.value.isEnabled) return true;

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

  function _setEnableSequence(value: boolean) {
    config.value.isEnabled = value;
  }

  function _cleanupSequence(withDisable?: boolean) {
    states.value = {};

    withDisable && _setEnableSequence(false);
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

  onUnmounted(() => {
    _cleanupSequence(withDisable);
  });

  return {
    updateSequence: _updateSequence,
    cleanupSequence: _cleanupSequence,
    setEnableSequence: _setEnableSequence,
    isSequenceComplete,
    currentID: () => currentID.value,
  };
};
