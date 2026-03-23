interface Props {
  status: 'pendiente' | 'confirmada' | 'cancelada';
}

const statusStyles = {
  pendiente:  'background:#FEF3C7; color:#92400E; border:1px solid #F59E0B',
  confirmada: 'background:#D1FAE5; color:#065F46; border:1px solid #10B981',
  cancelada:  'background:#FEE2E2; color:#991B1B; border:1px solid #EF4444',
};

const statusLabels = {
  pendiente:  '⏳ Pendiente',
  confirmada: '✅ Confirmada',
  cancelada:  '❌ Cancelada',
};

const StatusBadge = ({ status }: Props) => {
  return (
    <span
      style={{
        ...Object.fromEntries(
          statusStyles[status].split(';').map((s) => {
            const [k, v] = s.split(':');
            return [k.trim(), v?.trim()];
          })
        ),
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        display: 'inline-block',
      }}
    >
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;