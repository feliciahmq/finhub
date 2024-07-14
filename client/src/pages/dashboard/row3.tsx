import BoxHeader from "@/components/boxHeader";
import DashboardBox from "@/components/dashboardBox";
import FlexBetween from "@/components/flexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme(); 
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (v: GridCellParams) => `$${v.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (v: GridCellParams) => `$${v.value}`,
    },
  ];
  
  const productRows = productData ? productData.slice(1) : [];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.60,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.37,
      renderCell: (v: GridCellParams) => `$${v.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (v: GridCellParams) => (v.value as Array<string>).length,
    },
  ];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value
            },
          ]
        }
      )
    }
  }, [kpiData]);

  return (
    <>  
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productRows?.length} products`} />
        <Box 
          mt="0.5rem" 
          p="0 0.5rem" 
          height="75%" 
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden"
            },
          }} 
        >
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productRows || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
          <Box 
            mt="1rem" 
            p="0 0.5rem" 
            height="80%" 
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden"
              },
            }} 
          >
            <DataGrid 
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={transactionData || []}
              columns={transactionColumns}
            />
          </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+2%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart 
                width={110} 
                height={78}
              >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={pieColors[index]} 
                    />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
          
        </FlexBetween>
      </DashboardBox>
          
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" sideText="+68%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box 
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="68%"
          >
          </Box>
          <Typography variant="h6" margin="0.5rem 1rem">
            Our performance metrics show significant improvement this year, highlighting our successful strategies and execution. The team's efforts have resulted in remarkable growth and achievement of our financial goals. 
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;