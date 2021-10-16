import Axios from 'axios'

export class Pipeless {
    URI = `https://api.pipeless.io/v1/apps/${ process.env.PIPELESS_APPID }/`
    CONFIG = { headers: { Authorization: `Bearer ${ process.env.PIPELESS_APIKEY }` } }

    path = ''
    data = {}

    getDataAsJSON() {
        return {
            ...this.data,
            synchronous: false,
        }
    }
}

export class Event extends Pipeless {
    constructor(start_object, relationship, end_object) {
        super();
        this.path = 'events'

        this.data = {
            event: {
                start_object,
                relationship,
                end_object
            }
        }
    }

    async Save() {
        return Axios.post(`${ this.URI }${ this.path }`, { ... this.getDataAsJSON() }, { ...this.CONFIG } )
    }
}

export class Subject {
    id
    type
    // created_on
    // modified_on
    
    constructor(id, type, created_on = undefined, modified_on = undefined) {
        this.id = id
        this.type = type
        // this.created_on = created_on
        // this.modified_on = modified_on
    }
}

export class Relationship {
    type
    // created_on
    single
    
    constructor(type, created_on = undefined, single = true) {
        this.type = type
        // this.created_on = created_on
        this.single = single
    }
}


export const ObjectTypes = {
    user: 'user', product: 'product', image: 'image', comment: 'comment', article: 'article', post: 'post', video: 'video', content: 'content', tag: 'tag', category: 'category', app: 'app', book: 'book', person: 'person', skill: 'skill', job: 'job', company: 'company', account: 'account', card: 'card', country: 'country', state: 'state', film: 'film', cart: 'cart',
}

export const RelationshipTypes = {
    interestedIn: 'interestedIn', posted: 'posted', followed: 'followed', liked: 'liked', favorited: 'favorited', saved: 'saved', disliked: 'disliked', purchased: 'purchased', commentedOn: 'commentedOn', created: 'created', viewed: 'viewed', reported: 'reported', blocked: 'blocked', deleted: 'deleted', authored: 'authored', used: 'used', dismissed: 'dismissed', loggedIn: 'loggedIn', taggedWith: 'taggedWith', categorizedIn: 'categorizedIn', locatedIn: 'locatedIn', readQuarter: 'readQuarter', readHalf: 'readHalf', readAll: 'readAll', subscribedTo: 'subscribedTo', subscribedFrom: 'subscribedFrom', addedTo: 'addedTo', madeBy: 'madeBy', pausedOn: 'pausedOn'
}

export class Test extends Pipeless {
    constructor() {
        super();
        this.path = 'recent-events'
    }

    async Save() {
        return Axios.post(`${ this.URI }${ this.path }`, { limit: 1 } ,{ ...this.CONFIG } )
    }
}

export default {
    Event,
    Subject,
    Relationship,
    ObjectTypes,
    RelationshipTypes,
    Test
}