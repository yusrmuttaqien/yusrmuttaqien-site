export default function useDynamicCustomClass(id: string) {
  const route = useRoute();

  return computed(() => id + route.fullPath.replace('/', '-'));
}
