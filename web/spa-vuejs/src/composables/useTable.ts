import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { IMetadata } from "src/types/IMetadata";
import { IPagination } from "src/types/IPagination";
import { buildQueryParams } from "src/utils/buildQueryParams";
import { ref } from "vue";

export function useTable<T>({
    sortByDefault,
    sortAscDefault = true,
}:{
    sortByDefault: string,
    sortAscDefault?: boolean
}){
    const $q = useQuasar();

    const data = ref<T[]>([]);
    const metadata = ref<IMetadata>({} as IMetadata);
    const loading = ref<boolean>(false);
    
    const pagination = ref<IPagination>({
        page:1,
        perPage:10,
        sortDesc: sortAscDefault,
        sortBy: sortByDefault,
    })

    const fetchData = async (endpoint:string, queryParams:{ [key:string]: string | number | boolean } ) =>{
        loading.value = true;
        const result = await api.get(`${endpoint}?${buildQueryParams(queryParams)}`);
        data.value = result.data?.data;
        metadata.value = result.data?.metadata;
        loading.value = false;
    }

    return {
        $q,
        data,
        metadata,
        loading,
        pagination,
        fetchData
    }

}