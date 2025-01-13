import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript'
import { Optional } from 'sequelize'
import { User } from './User'

export interface DirectoryAttributes {
    id: number
    name?: string
    phone: string
    userId: number
    email?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface DirectoryCreationAttributes
    extends Optional<DirectoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({ tableName: 'directory' })
export class Directory extends Model<
    DirectoryAttributes,
    DirectoryCreationAttributes
> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name?: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    phone!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    email?: string

    @Column({
        type: DataType.DATE,
    })
    createdAt?: Date

    @Column({
        type: DataType.DATE,
    })
    updatedAt?: Date

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number

    @BelongsTo(() => User)
    user!: User
}
