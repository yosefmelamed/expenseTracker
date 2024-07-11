import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
    income?: number;
    expense?: number;
    error?: string;
}>{
const {userId} = auth();
if(!userId){
    return {error: 'User not found'}
}

try {
    const transactions = await db.transaction.findMany({
        where: {userId}
    });
        
    let income = 0;
    let expense = 0;
    const amounts = transactions.map((transaction)=> transaction.amount)
    const incomeExists = amounts.find((item)=> item > 0)
    const expenseExists = amounts.find((item)=> item < 0)
    if(expenseExists){
         expense = amounts.filter((item)=> item < 0).reduce((acc, item)=> acc + item)
        
    }
    if(incomeExists){
        income = amounts.filter((item)=> item > 0).reduce((acc, item)=> acc + item)
       
   }
    return {income, expense: Math.abs(expense)}
} catch (error) {
    return {error: 'Database Error'}
}

}

 export default getIncomeExpense;