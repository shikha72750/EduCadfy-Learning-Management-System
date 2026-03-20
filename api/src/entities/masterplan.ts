import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"masterplan"})
export class masterplan extends BaseEntity{
    @PrimaryGeneratedColumn({ name: "id" } )
    id: any
    
    @Column({ name: "name", type: "varchar", length: 255 ,nullable:true })
    name: any

    @Column({ name: "desc", type: "varchar", length: 255 ,nullable:true })
    desc: any

     @Column({ name: "status", type: "int", default:1})
     status: any
    
     @Column({ name: "credit", type: "int", nullable:true})
     credit: any

     @Column({ name: "created_at", type: "timestamp",default:()=>"CURRENT_TIMESTAMP" })
     created_at: any
    
     @Column({ name: "updated_at", type: "timestamp",default:()=>"CURRENT_TIMESTAMP" })
    updated_at: any
}