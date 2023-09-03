const Item=require('../models/item');

exports.getItems= async(req,res,next)=>{
    try{
      const result = await Item.findAll();
      res.json(result);
    }catch (err){
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching items.' });
    }
};
  
exports.postItem= async(req,res,next)=>{
    const { name, desc, price, qty } = req.body;
    try {
        const newItem = await Item.create({
        name: name,
        desc: desc,
        price: price,
        qty: qty
        });
        console.log(newItem.id);
        res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the item.' });
    }
};
  

exports.updateItem= async(req,res,next)=>{
    const itemId=req.params.id;
    try{
        const item=await Item.findByPk(itemId);
        if(!item){
            return res.status(404).json({ error: 'Item not found' });
        }
        //update quantity
        let qty = req.body.qty;
        // delete the item if quantity is 0
        if(qty===0){
            await item.destroy();
            // Save the updated item
            res.status(200).json({error:'item is deleted successfully'});
        }
        else{
            item.qty=qty;
            await item.save();
            res.json(item);
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the item' });
    }
};