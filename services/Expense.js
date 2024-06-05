const Expense = require('../models/Expense');

class ExpenseService {
    async getExpenseTotal(pid) {
        try {
            const billableAmount = await this.expenseDao.findBillableByProject(pid);
            const nonBillableAmount = await this.expenseDao.findNonBillableByProject(pid);
            return {
                Billable: billableAmount,
                'Non-billable': nonBillableAmount,
                Total: billableAmount + nonBillableAmount,
            };
        } catch (error) {
            throw error;
        }
    }

    async addExpense(e) {
        try {
            return await Expense.create(e);
        } catch (error) {
            throw error;
        }
    }

    async getExpense(id) {
        try {
            const expense = await Expense.findById(id);
            if (!expense) {
                throw new Error(`Expense with id ${id} not found.`);
            }
            return expense;
        } catch (error) {
            throw error;
        }
    }

    async getExpenseByEmplyoeeId(id) {
        try {
            return await Expense.find({ employee: id });
        } catch (error) {
            throw error;
        }
    }

    async getExpenseByProject(id) {
        try {
            return await Expense.find({ project: id });
        } catch (error) {
            throw error;
        }
    }

    async getExpenseByStatus(id) {
        try {
            return await Expense.find({ status: id });
        } catch (error) {
            throw error;
        }
    }

    async getAllExpense() {
        try {
            return await Expense.find();
        } catch (error) {
            throw error;
        }
    }

    async deleteExpense(id) {
        try {
            await Expense.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteExpenses(expenseId) {
        try {
            await Expense.deleteMany({ _id: { $in: expenseId } });
        } catch (error) {
            throw error;
        }
    }

    async paginateExpense(page, size) {
        try {
            return await Expense.find().skip(page * size).limit(size);
        } catch (error) {
            throw error;
        }
    }

    async getExpenseByStatusforProject(pid, status) {
        try {
            return await Expense.find({ project: pid, status });
        } catch (error) {
            throw error;
        }
    }

    async updateExpenseStatus(updates, e) {
        try {
            Object.assign(e, updates);
            return await e.save();
        } catch (error) {
            throw error;
        }
    }

    async updateExpense(updates, e) {
        try {
            if (updates.hasOwnProperty('endDate')) {
                throw new Error('Date cannot be updated');
            } else if (updates.hasOwnProperty('attachments')) {
                const docIds = updates.attachments.map(doc => doc.id);
                const docObjs = await this.documentDao.find({ _id: { $in: docIds } });
                e.attachments = docObjs;
            } else {
                Object.assign(e, updates);
            }
            return await e.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ExpenseService;
