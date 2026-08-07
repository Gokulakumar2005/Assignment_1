import ComponentModel from "../model/ComponentModel.js";

const ComponentCtrl = {};

ComponentCtrl.Create = async (req, res) => {
    const body = req.body;

    try {
        const component = await ComponentModel.findOne({
            name: body.name,
            category: body.category,
        });

        if (component) {
            return res.status(400).json({
                error: "Component already exists",
            });
        }

        const newComponent = new ComponentModel(body);
        newComponent.priceHistory = [{ price: body.currentPrice }];

        await newComponent.save();

        res.status(201).json(newComponent);
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            error: err.message,
        });
    }
};

ComponentCtrl.List = async (req, res) => {
    try {
        const components = await ComponentModel.find();
        res.json(components);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

ComponentCtrl.fetchALLComponent = async (req, res) => {
    try {
        const response = await ComponentModel.find();
        res.json(response)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

ComponentCtrl.UpdatePrice = async (req, res) => {
    const { id } = req.params;
    const { currentPrice } = req.body;
    try {
        const component = await ComponentModel.findById(id);
        if (!component) {
            return res.status(404).json({ error: "Component not found" });
        }
        
        component.priceHistory.push({ price: currentPrice, updatedAt: new Date() });
        component.currentPrice = currentPrice;
        
        await component.save();
        res.json(component);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

ComponentCtrl.Delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComponent = await ComponentModel.findByIdAndDelete(id);
        if (!deletedComponent) {
            return res.status(404).json({ error: "Component not found" });
        }
        res.json({ message: "Component deleted successfully", id });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

export default ComponentCtrl;