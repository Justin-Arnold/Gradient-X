export interface Assignment {
    _id: string,
    archived: false,
    assignment_type: string,
    attachments: [],
    author: {
        _id: string,
        first: string,
        last: string
    },
    blocks_match: boolean,
    can_edit: boolean,
    can_report: boolean,
    can_scan: boolean,
    created: Date,
    credit_score: number,
    date: Date,
    description: string,
    foreign_data: [],
    has_answerKey: boolean,
    labels: [],
    length: number,
    max_score: number,
    modified: Date,
    name: string,
    priv: boolean,
    purged: boolean,
    stats: {
        count: number,
        percentage_avg: number
    },
    trashed: boolean,
    versions: string[]
}

export interface AssignmentList {
    filteredItems: Assignment[]
}

export interface AssignmentFilters {
    view: 'current' | 'student' | 'archive' | 'trash',
    owner: 'anyone' | 'me' | 'others',
    label: 'all',
    term: 'current' | 'all',
}
