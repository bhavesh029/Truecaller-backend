import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { Optional } from 'sequelize'

export interface UserAttributes {
    id: number
    name: string
    password: string
    phone: string
    email?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string

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
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    spamCount!: number

    @Column({
        type: DataType.DATE,
    })
    createdAt?: Date

    @Column({
        type: DataType.DATE,
    })
    updatedAt?: Date
}
