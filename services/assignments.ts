const baseUrl = 'http://localhost:3000/api3/listReport';
const assignmentUrl = 'http://localhost:3000/api3/assignments';

const assignmentsService = {
    async getAllAssignments(userId: string) {
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
                    archived: 'disallow',
                    owned: 'allow',
                    term: 'current',
                    trashed: 'disallow',
                    type: 'assignment'
                }
            }),
        });
        return resp
    },
    async getResponsesById(id: string) {
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
                sortKey: 'created',
                reports: {
                    overall: true
                },
                list: {
                    assignment: id,
                    scanState: 'turnedIn',
                    scannable: true,
                    section: '63ed217df5c09b38d3be2a44',
                    term: 'current',
                    type: 'scan'
                }
            }),
        });
        return resp
    },
    async createNewAssignment(name: string, description: string, type: string) {
        const body = {
            "name": name,
            "assignment_type": type,
            "date": new Date(),
            "defaultPoints": 1,
            "length": 10,
            "max_score": 0,
            "credit_score": 0,
            "owner": null,
            "priv": false,
            "can_scan": true,
            "can_report": true,
            "description": description,
            "answer_keys": [
                {
                    "version": "1",
                    "questions": [
                        {
                            "label": "1",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "2",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "3",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "4",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "5",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "6",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "7",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "8",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "9",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        },
                        {
                            "label": "10",
                            "type": "mc",
                            "choices": "ABCDE",
                            "stds": [],
                            "pmap": {
                                "": 1
                            }
                        }
                    ],
                    "name": "Primary Key"
                }
            ]
        }
        const resp = await $fetch(`${assignmentUrl}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return resp
    },
    async getAssignmentById(id: string) {
        const resp = await $fetch(`${assignmentUrl}/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resp
    }
}

export default assignmentsService;