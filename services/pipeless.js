import Axios from 'axios'

export class Pipeless {
    URI = `https://api.pipeless.io/v1/apps/${ process.env.PIPELESS_APPID }/`
    CONFIG = { headers: { Authorization: `Bearer ${ process.env.PIPELESS_APIKEY }` } }

    path = ''
    data = {}

    getDataAsJSON() {
        return { ...this.data, synchronous: false }
    }

    static async getActivity(subject) {
        try {
            const request = { method: 'GET', url: `${_URI}algos/activity/object`, data: subject, ..._CONFIG }
            const data = await Axios(request).then( res => res.data )
            return data || { events: [] }
        } catch (error) {
            return { events: [] }
        }
    }
}

export class Event extends Pipeless {
    constructor(start_object, relationship, end_object) {
        super();
        this.path = 'events'
        this.data = {
            event: { start_object, relationship, end_object }
        }
    }

    async Save() {
        return Axios.post(`${this.URI}${this.path}`, { ... this.getDataAsJSON() }, { ...this.CONFIG })
    }
}

export class Subject {
    id
    type

    constructor(id, type) {
        this.id = id
        this.type = type
    }

    static App() { return new Subject(process.env.APP_NAME, ObjectTypes.app) }
    static User(id) { return new Subject(id, ObjectTypes.user) }
    static Role(id) { return new Subject(id, ObjectTypes.skill) }
}

export class Relationship {
    type
    single

    constructor(type, single = true) {
        this.type = type
        this.single = single
    }

    static Created() { return new Relationship(RelationshipTypes.created) }
    static Updated() { return new Relationship(RelationshipTypes.updated, false) }
    static Deleted() { return new Relationship(RelationshipTypes.deleted) }
    static LoggedIn() { return new Relationship(RelationshipTypes.loggedIn, false) }
}

export const ObjectTypes = {
    account: "account",
    app: "app",
    article: "article",
    book: "book",
    card: "card",
    cart: "cart",
    category: "category",
    comment: "comment",
    company: "company",
    content: "content",
    country: "country",
    film: "film",
    image: "image",
    job: "job",
    person: "person",
    post: "post",
    product: "product",
    skill: "skill",
    state: "state",
    tag: "tag",
    user: "user",
    video: "video"
}

export const RelationshipTypes = {
    addedTo: "addedTo",
    authored: "authored",
    blocked: "blocked",
    categorizedIn: "categorizedIn",
    commentedOn: "commentedOn",
    created: "created",
    deleted: "deleted",
    disliked: "disliked",
    dismissed: "dismissed",
    favorited: "favorited",
    followed: "followed",
    interestedIn: "interestedIn",
    liked: "liked",
    locatedIn: "locatedIn",
    loggedIn: "loggedIn",
    madeBy: "madeBy",
    pausedOn: "pausedOn",
    posted: "posted",
    purchased: "purchased",
    readAll: "readAll",
    readHalf: "readHalf",
    readQuarter: "readQuarter",
    reported: "reported",
    saved: "saved",
    subscribedFrom: "subscribedFrom",
    subscribedTo: "subscribedTo",
    taggedWith: "taggedWith",
    used: "used",
    updated: "updated",
    viewed: "viewed"
}

export const RelationshipTypesLabels = {
    incoming: {
        addedTo: "recebeu",
        authored: "foi escrito por",
        blocked: "foi bloqueado por",
        categorizedIn: "foi adicionada em",
        commentedOn: "recebeu um comentário de",
        created: "foi cadastrado no",
        deleted: "foi removido por",
        disliked: "não gostou de",
        dismissed: "foi demitido por",
        favorited: "foi favoritado por",
        followed: "foi seguido por",
        interestedIn: "tem um interessado,",
        liked: "foi curtido por",
        locatedIn: "tinha",
        loggedIn: "teve o acesso de",
        madeBy: "criou",
        pausedOn: "pause on (incoming)",
        posted: "foi postado por",
        purchased: "foi comprado por",
        readAll: "foi visto por",
        readHalf: "foi visto metade por",
        readQuarter: " foi visto um quarto por",
        reported: "foi reportado por",
        saved: "está salvo em",
        subscribedFrom: "inscreveu",
        subscribedTo: "recebeu a inscrição de",
        taggedWith: "foi adicionada em",
        used: "foi usado por",
        updated: "foi atualizado por",
        viewed: "foi visualizado por"
    },
    outgoing: {
        addedTo: "adicionado para",
        authored: "escreveu",
        blocked: "bloquiou",
        categorizedIn: "categorizou em",
        commentedOn: "comentou em",
        created: "cadastrou",
        deleted: "removeu",
        disliked: "não gostou de",
        dismissed: "demitiu",
        favorited: "favoritou",
        followed: "seguiu",
        interestedIn: "está interessado em",
        liked: "gostou",
        locatedIn: "está em",
        loggedIn: "fez login em",
        madeBy: "feito por",
        pausedOn: "parou em",
        posted: "postou",
        purchased: "comprou",
        readAll: "viu todo",
        readHalf: "viu metade",
        readQuarter: "viu um quarto",
        reported: "reportou",
        saved: "salvou",
        subscribedFrom: "inscrito de",
        subscribedTo: "se inscreveu para",
        taggedWith: "classificou com",
        used: "usou",
        updated: "atualizou",
        viewed: "visualizou"
    }
}

export class Test extends Pipeless {
    constructor() { super(); this.path = 'recent-events'; }
    async Save() { return Axios.post(`${ this.URI }${ this.path }`, { limit: 1 }, { ...this.CONFIG }) }
}

export default { Event, Subject, Relationship, ObjectTypes, RelationshipTypes, Test }