import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommas } from "@/lib/utils";

const IncomeExpense = async() => {

    const {income, expense} = await getIncomeExpense();
    console.log(income, expense)
    return ( 
        <div className="inc-exp-container">
            <div>
            <h4>Income</h4>
            <p className="money plus">${income ? addCommas(Number(income?.toFixed(2))) : 0}</p>
            </div>
            <div>
            <h4>Expense</h4>
            <p className="money minus">${expense ? addCommas(Number(expense?.toFixed(2))) : 0}</p>
            </div>
        </div>
     );
}
 
export default IncomeExpense;