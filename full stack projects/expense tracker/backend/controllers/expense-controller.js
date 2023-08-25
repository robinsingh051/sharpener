const Expense=require('../models/expense');

exports.getExpenses=(req,res,next)=>{
    Expense.findAll()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.postExpenses=(req,res,next)=>{
    const expense = req.body.expense;
    const desc = req.body.desc;
    const cat=req.body.cat;
    console.log(expense,desc,cat);
    Expense.create({
        expense:expense,
        desc:desc,
        cat:cat
    })
    .then((newExpense)=>{
        console.log(newExpense.id);
        Expense.findByPk(newExpense.id)
        .then((expense)=>{
            res.status(201).json(expense);
        })
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.getExpense=(req,res,next)=>{
    const expenseId=req.params.id;
    Expense.findByPk(expenseId)
    .then((expense)=>{
        res.json(expense);
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.deleteExpense=(req,res,next)=>{
    const expenseId=req.params.id;
    Expense.findByPk(expenseId)
    .then((expense)=>{
        return expense.destroy();
    })
    .then(()=>{
        res.satus(204).json({success:"expense is deleted"});
    })
    .catch((err)=>{
        console.log(err);
    });
};