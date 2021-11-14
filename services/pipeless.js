import Axios from 'axios'

const _CONFIG = { headers: { Authorization: `Bearer ${process.env.PIPELESS_APIKEY}` } }
const _URI = `https://api.pipeless.io/v1/apps/${process.env.PIPELESS_APPID}/`

export class Pipeless {
    URI = _URI
    CONFIG = _CONFIG

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
        const result = await Axios.post(this.URI + this.path, this.getDataAsJSON(), this.CONFIG)
            .then( res => res.data )
            .catch( err => { console.error(err); return false } )
        console.log('pipeless result:', result);
        return result
    }
}

export class Subject {
    id
    type

    constructor(id, type) {
        this.id = id
        this.type = type
    }

    static App() { return new Subject(process.env.NEXT_PUBLIC_APP_NAME, ObjectTypes.app) }
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
    
    static Status( status ) { 
        return new Relationship( status ? RelationshipTypes.enabled : RelationshipTypes.disabled , false)
    }
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

export const ObjectTypesLabels = {
    account: "conta",
    app: "app",
    article: "artigo",
    book: "livr",
    card: "cartão",
    cart: "carrinho",
    category: "categoria",
    comment: "comentário",
    company: "compania",
    content: "conteúdo",
    country: "país",
    film: "filme",
    image: "imagem",
    job: "trabalho",
    person: "pessoa",
    post: "publicação",
    product: "produto",
    skill: "habilidade",
    state: "estado",
    tag: "tag",
    user: "usuário",
    video: "vídeo"
}

export const RelationshipTypes = {
    addedTo: "addedTo",
    authored: "authored",
    blocked: "blocked",
    categorizedIn: "categorizedIn",
    commentedOn: "commentedOn",
    created: "created",
    deleted: "deleted",
    disabled: "disabled",
    disliked: "disliked",
    dismissed: "dismissed",
    enabled: "enabled",
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
        categorizedIn: "foi adicionado por",
        commentedOn: "recebeu um comentário de",
        created: "foi cadastrado por",
        deleted: "foi removido por",
        disabled: "foi desativado por",
        disliked: "não gostou de",
        dismissed: "foi demitido por",
        enabled: "foi ativado por",
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
        categorizedIn: "categorizou no",
        commentedOn: "comentou no",
        created: "cadastrou",
        deleted: "removeu",
        disabled: "desativou",
        disliked: "não gostou do",
        dismissed: "demitiu",
        enabled: "ativou",
        favorited: "favoritou",
        followed: "seguiu",
        interestedIn: "está interessado no",
        liked: "gostou",
        locatedIn: "está no",
        loggedIn: "fez login no",
        madeBy: "feito por",
        pausedOn: "parou no",
        posted: "postou",
        purchased: "comprou",
        readAll: "viu todo",
        readHalf: "viu metade",
        readQuarter: "viu um quarto",
        reported: "reportou",
        saved: "salvou",
        subscribedFrom: "inscrito de",
        subscribedTo: "se inscreveu no",
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