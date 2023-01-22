import type { PageServerLoad } from './$types';
const _PREFIX_BETA = "__D1_BETA__";
const _KEY_D1DB = "D1DB";
export const load = (async ({ platform }) => {
    if (platform) {
        try {
            // const obj: { [key: string]: string } = {};
            const res = await platform?.env[_PREFIX_BETA + _KEY_D1DB]?.fetch("/query", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    sql: 'select name from sqlite_master where type="table"',
                    params: [],
                })
            });
            const obj = await res.json();
            return { "result": obj };
        } catch (error) {
            if (error instanceof Error) {
                return { e: error.message } //errorがErrorクラスである場合messageがフィールドに含まれることが保証されるので型安全
            } else if (typeof error === 'string') {
                return { e: error }
            } else {
                return { e: "unexpected error" }
            }

        }
    }
    return {}
}) satisfies PageServerLoad;