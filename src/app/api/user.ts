export class User{
    
    shortName: string;
    name: string;
    description: string;
    image: string;
    template: string;
    created: Date;
    updated: Date;
    plan: string;
    culture: string;
    active: boolean;
    analytics?: {
        user: {
            total: number,
            actived: number
        },
        message: {
            received: number,
            sent: number
        }
    }

    constructor(
        shortName: string = null,
        name: string = null,
        description: string = null,
        image: string = null,
        template: string = null,
        created: Date = new Date(),
        updated: Date = new Date(),
        plan: string = null,
        culture: string = null
    ){
        this.shortName = null;
        this.name = null;
        this.description = null;
        this.image = null;
        this.template = null;
        this.created = new Date();
        this.updated = new Date();
        this.plan = PlanType.STANDARD;
        this.culture = Culture.PT_BR;
        this.active = false;
        this.analytics = {
            user: {
                total: 0,
                actived: 0
            },
            message: {
                received: 0,
                sent: 0
            }
        }
    }
}

export enum PlanType {
    STANDARD = 'standard'
}

export enum Template{
    MASTER = 'master'
}

export enum Culture{
    PT_BR = 'pt-BR'
}