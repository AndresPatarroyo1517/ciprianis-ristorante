import './OrderStatus.css'

export const OrderStatusBadge= ({ status }: { status: string }) => {
    return (
      <span className={`status-badge status-${status.toLowerCase().replace(/ /g, '-')}`}>
        {status}
      </span>
    )
}