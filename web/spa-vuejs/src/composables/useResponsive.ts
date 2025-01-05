import { useQuasar } from "quasar";
import { computed } from "vue";

export function useResponsive(){
    const $q = useQuasar();

    const isMobile = computed(() => {
        return $q.screen.lt.md;
    });
    
    const isDesktop = computed(()=>{
        return !isMobile.value;
    });

    return {
        isMobile,
        isDesktop,
    }
}