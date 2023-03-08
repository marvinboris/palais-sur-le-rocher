import { Model, Schema, Types } from "mongoose";

export enum TransactionStatus {
  Pending,
  Failed,
  Completed,
}

export interface TransactionInterface {
  id?: string;
  method?: Types.ObjectId;
  amount: number;
  address?: string;
  currency?: string;
  txId?: string;
  txHash?: string;
  data?: object;
  status?: TransactionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TransactionSchema = new Schema<
  TransactionInterface,
  Model<TransactionInterface>
>(
  {
    method: {
      type: Types.ObjectId,
      required: true,
      ref: "Method",
    },
    amount: {
      type: Number,
      required: true,
    },
    address: String,
    currency: String,
    txId: String,
    txHash: String,
    data: Object,
    status: {
      type: Number,
      required: true,
      enum: [
        TransactionStatus.Pending,
        TransactionStatus.Failed,
        TransactionStatus.Completed,
      ],
      default: TransactionStatus.Pending,
    },
  },
  { timestamps: true }
);
