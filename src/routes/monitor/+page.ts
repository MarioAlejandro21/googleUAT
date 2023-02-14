import { updateMonitorData } from '$lib/db';
import type { PageLoad } from './$types';

export const load = (async () => {


    await updateMonitorData()


    return {};
}) satisfies PageLoad;