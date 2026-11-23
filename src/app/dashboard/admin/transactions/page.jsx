import AdminTransactionsClient from "@/components/transactions/admin-transactions-client";
import { getTransactions } from "@/lib/actions/transactions";

const TransactionsPage = async () => {
  let transactions = [];

  try {
    const result = await getTransactions();
    transactions = Array.isArray(result) ? result : result.transactions || result.data || [];
  } catch {
    transactions = [];
  }

  return <AdminTransactionsClient initialTransactions={transactions} />;
};

export default TransactionsPage;
