import React , {Component} from 'react';
import './normalize.css';
import './style.css';
import Total from './components/total/Total'
import History from './components/history/History'
import Operation from './components/operation/Operation';


const Header = () => (
  <header>
    <h1>Кошелек</h1>
    <h2>Калькулятор расходов</h2>
  </header>
);

// const Main = () => (
//   <main>
//     <div className="container">
//       <Total balance={0} income={0} expenses={0} />
//       <History />
//       <Operation />
//     </div>
//   </main>
// );

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
      description: '',
      amount: '',
      income: 0,
      expenses: 0,
    };
    this.addAmount = this.addAmount.bind(this);
  }

  addTransaction = add => {

    const transactions = [...this.state.transactions];

    const transaction = {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: parseFloat(this.state.amount),
      add
    };

    transactions.push(transaction);
    this.setState({
      transactions, /* or { transactions: transactions} */ 
      description: '',
      amount: '',
      income: add ? (this.state.income + Number(this.state.amount)) : this.state.income,
      expenses: add ? this.state.expenses : (this.state.expenses + Number(this.state.amount)),
    }, () => {
      this.addStorage(); 
      console.log(`TOTAL UPDATED: ${this.state.income - this.state.expenses} ₽`)
      }) /* callback function may be used this */
  }

  addDescription = e => { /* for save this on object */
    this.setState({description: e.target.value});
  }

  addAmount(e) { /* this bind in constructor */
    this.setState({amount: e.target.value});
  }

  getIncome = () => this.state.transactions
    .reduce((acc, item) => item.add ? item.amount + acc : acc, 0)
  
  getExpenses = () => this.state.transactions
    .reduce((acc, item) => !item.add ? item.amount + acc : acc, 0)

  getTotalBalance() {
    const resultIncome = this.getIncome();
    const resultExpenses = this.getExpenses();

    this.setState({
      income: resultIncome,
      expenses: resultExpenses,
    })
  }

  componentWillMount() {
    this.getTotalBalance();
  }

  componentWillUpdate() {
    this.addStorage();
  }

  addStorage() {
    localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions));
  }

  delTransaction = key => {
    const transactions = this.state.transactions.filter(item => item.id !== key);
    this.setState({ transactions }, this.getTotalBalance);
  }

  render() {
    return (
      <React.Fragment> {/* or only clean brackets <> and </> */}
        <Header />
        {/* <Main /> */}
        <main>
          <div className="container">
            <Total 
              balance={this.state.income - this.state.expenses} 
              income={this.state.income} 
              expenses={this.state.expenses} 
            />
            <History 
              transactions={this.state.transactions}
              delTransaction={this.delTransaction}
            />
            <Operation 
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;