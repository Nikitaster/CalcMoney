import React from 'react';

const HistoryItem = ({ transaction , delTransaction }) => ( 
    <li 
        className={`history__item ${transaction.add ? 'history__item-plus' : 'history__item-minus'}`}>
        {transaction.description || (transaction.add ? "Доход" : "Расход")}
      <span className="history__money">+{transaction.amount || 0} ₽</span>
      <button className="history__delete" onClick={() => delTransaction(transaction.id)}>x</button>
    </li>
);
  
// const Expenses = ({value}) => (
// <li className="history__item  history__item-minus">Отдал долг
//     <span className="history__money">-{value} ₽</span>
//     <button className="history__delete">x</button>
// </li>
// );

export default HistoryItem;