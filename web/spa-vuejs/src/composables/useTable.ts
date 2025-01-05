import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { IMetadata } from "src/types/IMetadata";
import { IPagination } from "src/types/IPagination";
import { buildQueryParams } from "src/utils/buildQueryParams";
import { ref } from "vue";

export function useTable<T>({
    sortByDefault,
    sortAscDefault = true,
}: {
    sortByDefault: string,
    sortAscDefault?: boolean
}) {
    const $q = useQuasar();

    const data = ref<T[]>([]);
    const metadata = ref<IMetadata>({} as IMetadata);
    const loading = ref<boolean>(false);

    const pagination = ref({
        page: 1,
        rowsPerPage: 5,
        descending: sortAscDefault,
        sortBy: sortByDefault,
        rowsNumber: 0,
    })

    const fetchData = async (endpoint: string, queryParams: { [key: string]: string | number | boolean }) => {
        try {
            loading.value = true;
            const result = await api.get(`${endpoint}?${buildQueryParams(queryParams)}`);
            data.value = result.data?.data;
            metadata.value = result.data?.metadata;
            pagination.value.rowsNumber = result.data?.metadata.total
        }
        catch (e) {
            $q.dialog({
                title: 'Ocorreu um erro',
                message:
                    'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
                color: 'negative',
            });
        }
        finally {
            loading.value = false;
        }
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