import { updateMonitorData } from '../../stores/dbStores';
import type { PageLoad } from './$types';

export const load = (async () => {


    await updateMonitorData()


    return {};
}) satisfies PageLoad;