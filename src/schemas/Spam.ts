import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript'
import { User } from './User'
import { Optional } from 'sequelize'

export interface SpamAttributes {
    id: number
    userId: number
    phone: string
    comments?: string
}

export interface SpamCreationAttributes
    extends Optional<SpamAttributes, 'id' | 'comments'> {}

@Table({
    tableName: 'spams',
    timestamps: true,
})
export class Spam extends Model<SpamAttributes, SpamCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    comments?: string

    @BelongsTo(() => User)
    user!: User
}
