interface FieldConfig<T> {
  name: keyof T;
  label?: string;
  type?: FieldType;
  rules?: any[];
  valuePropName?: string;
}

interface FieldTypeCreatePost {
  id?: string;
  title?: string;
  description?: string;
}

interface dataCust {
  id: number | null;
  name?: string | null;
  gender?: string | null;
  email?: string | null;
  status?: string | null;
}

interface dataPost {
  id?: number;
  user_id?: number;
  title?: string;
  body?: string;
}
interface CardType {
  type: "totalUser" | "totalPost" | "userStatus" | "userGender";
  title: string;
}
type GuestEmail = Pick<dataCust, "email">;
type SessionData = Pick<dataCust, "email" | "name">;
