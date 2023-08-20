import Usage from '../types/Usage';

interface TokenCostCounterProps {
  usage?: Usage;
  tokenSuffix?: string;
}

function TokenCostCounter({ tokenSuffix, usage }: TokenCostCounterProps) {
  return (
    <div className="flex flex-row justify-end gap-x-3 select-none text-sm font-light text-white">
      {usage?.totalTokensUsed && (
        <span>
          {usage.totalTokensUsed} {tokenSuffix}
        </span>
      )}
      {usage?.totalSpent && <span>${usage.totalSpent.toFixed(5)}</span>}
    </div>
  );
}
TokenCostCounter.defaultProps = {
  usage: undefined,
  tokenSuffix: 'tok',
};
export default TokenCostCounter;
