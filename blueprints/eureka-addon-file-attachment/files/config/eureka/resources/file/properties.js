
export default {
    title: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    path: {
        type: 'string',
        propagateDeletion: true
    },
    thumbPath: {
        type: 'string',
        propagateDeletion: true
    },
    type: {
        type: 'string'
    },
    lastModified: {
        type: 'datetime'
    },
    size: {
        type: 'integer'
    },
    // TODO author
};