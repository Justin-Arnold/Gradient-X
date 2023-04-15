const baseUrl = 'http://localhost:3000/api3/listReport';

const sectionsService = {
    async getAllSections() {
        const resp = await $fetch(`${baseUrl}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                limit: 100,
                lng: 'en',
                sortDir: 1,
                sortKey: 'date',
                reports: {
                    overall: true
                },
                list: {
                    sectionOwned: 'only',
                    term: 'current',
                    type: 'section'
                }
            }),
        });
        return resp
    }
}

export default sectionsService;