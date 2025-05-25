import { Card } from "antd";

interface ContentValue {
  contentType: CardType;
  totalData: string;
}

const CardDashboard = ({ contentType, totalData }: ContentValue) => {
  const { title, type } = contentType;
  return (
    <Card style={{ width: 420, height: 130 }}>
      <div className="flex flex-col">
        <h2 className="font-semibold text-[16px] text-gray-400">{title}</h2>
        <p className="font-bold spa text-4xl">
          {totalData}
        </p>
      </div>
    </Card>
  );
};

export default CardDashboard;
