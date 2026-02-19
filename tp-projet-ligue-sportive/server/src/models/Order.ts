import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_ids: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // array(product_id)
  date: { type: Schema.Types.Date, default: Date.now },
  price: { type: Number, required: true }
}, { timestamps: true });

export const Order = model('Order', orderSchema);