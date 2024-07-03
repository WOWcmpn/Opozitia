import React from "react";
import { ThemedLayoutV2 } from '@refinedev/antd';

export default async function Layout({ children }: React.PropsWithChildren) {

  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
}