import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
