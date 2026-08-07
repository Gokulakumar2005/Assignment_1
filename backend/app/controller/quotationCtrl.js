import QuotationModel from "../model/QuotationModel.js";

const QuotationCtrl = {};

QuotationCtrl.Create = async (req, res) => {
    try {
        const { clientName, items, totalPrice } = req.body;
        const quotation = new QuotationModel({
            saleExecutive: req.userId,
            clientName,
            items,
            totalPrice
        });
        await quotation.save();
        res.status(201).json(quotation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

QuotationCtrl.List = async (req, res) => {
    try {
        const quotations = await QuotationModel.find()
            .populate("saleExecutive", "userName email")
            .sort({ createdAt: -1 });
        res.json(quotations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default QuotationCtrl;
