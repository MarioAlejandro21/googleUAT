import { updateArchiveData } from '../../stores/dbStores';
import type { PageLoad } from './$types';

export const load = (async () => {
    
    await updateArchiveData()

    return {};
}) satisfies PageLoad;