<script setup>
	import { ref, onMounted } from "vue";
	import { FrontLogAPI } from "@/apis/frontLog";
	import { ProductAPI } from "@/apis/product";
	import { isEqual, round } from "lodash";
	import { format } from "@/utils/date";
	const page = ref(10);
	const pageNum = ref(1);
	const total = ref(0);
	const logList = ref();
	const productList = ref();
	const getLogList = async () => {
		const res = await FrontLogAPI.getAll({ page: page.value, pageNum: pageNum.value });
		logList.value = res.data;
		console.log(res.data, "@@@");
		logList.value = res.data.map(item => ({
			...item,
			res: {
				...item.res,
				giftProduct: item.res.giftProduct.map(gift => ({
					...gift,
					...productList.value.find(i => i.name === gift.name),
					num: gift.num,
				})),
				product: item.res.product.map(product => ({
					...product,
					...productList.value.find(i => i.name === product.name),
					num: product.num,
				})),
			},
		}));
		console.log(logList.value, "!!");
		if (pageNum.value === 1) {
			total.value = res.count;
		}
	};
	const currentChangeHandler = _pageNum => {
		pageNum.value = _pageNum;
		getLogList();
	};
	const sizeChangeHandler = _page => {
		page.value = _page;
		getLogList();
	};
	onMounted(async () => {
		const res = await ProductAPI.getAll();
		productList.value = res.data;
		console.log(productList.value);
		await getLogList();
	});
</script>

<template>
	<div class="front-log">
		<el-table :data="logList" style="width: 100%" height="570">
			<el-table-column type="expand">
				<template #default="{ row }">
					<div class="expand">
						<p>
							<span>{{ row.res.priceSystem }}</span>
							<el-divider direction="vertical" />
							<span>{{ row.res.department }}</span>
							<el-divider direction="vertical" />
							<span v-if="row.res.onepieceforshipping">
								<span>{{ row.res.onepieceforshipping }}</span>
								<el-divider direction="vertical" />
							</span>
							<span>{{ row.res.platform }}</span>
							<el-divider direction="vertical" />
							<span>{{ row.res.transportationMethod }}</span>
						</p>
						<p>
							<span>
								<span>售价：</span>
								<span>{{ row.res.money }} ￥</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>费比佣金：</span>
								<span>{{ round(row.res.feeRatio * 100, 2) }} %</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>运费：</span>
								<span>{{ row.res.freight }} ￥</span>
							</span>
						</p>
						<p>
							<span>
								<span>财务成本：</span>
								<span>{{ row.res.financialProductionCosts }} ￥</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>财务利润目标：</span>
								<span>{{ row.res.financialProfitTarget * 100 }}</span>
								<span> %</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>财务利润率：</span>
								<span>{{ round(row.res.financialProfitMargins * 100, 2) }}</span>
								<span> %</span>
							</span>
						</p>
						<p>
							<span>
								<span>业务成本：</span>
								<span>{{ row.res.businessProductionCosts }} ￥</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>业务利润目标：</span>
								<span>{{ row.res.businessProfitTarget * 100 }}</span>
								<span> %</span>
							</span>
							<el-divider direction="vertical" />
							<span>
								<span>业务利润率：</span>
								<span>{{ round(row.res.businessProfitMargins * 100, 2) }}</span>
								<span> %</span>
							</span>
						</p>
						<div v-if="row.res.product && !isEqual(row.res.product?.length, 0)">
							<h4>商品列表:</h4>
							<el-table :data="row.res.product" border>
								<el-table-column label="名称" prop="name" />
								<el-table-column label="数量" prop="num" />
								<el-table-column label="财务成本(￥)" prop="financial_costs" />
								<el-table-column label="业务成本(￥)" prop="cost" />
							</el-table>
						</div>
						<div v-if="row.res.giftProduct && !isEqual(row.res.giftProduct?.length, 0)">
							<h4>赠品列表:</h4>
							<el-table :data="row.res.giftProduct" border>
								<el-table-column label="名称" prop="name" />
								<el-table-column label="数量" prop="num" />
								<el-table-column label="财务成本(￥)" prop="financial_costs" />
								<el-table-column label="业务成本(￥)" prop="cost" />
							</el-table>
						</div>
						<div
							v-if="
								row.res.specialProduct &&
								!isEqual(row.res.specialProduct?.length, 0)
							"
						>
							<h4>特殊配赠列表:</h4>
							<el-table :data="row.res.specialProduct" border>
								<el-table-column label="名称" prop="name" />
								<el-table-column label="数量" prop="num" />
								<el-table-column label="价格(￥)" prop="cost" />
							</el-table>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="查询人员信息">
				<template #default="{ row }">
					<span>{{ row.res.name === "" ? "unknown" : row.res.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="查询时间">
				<template #default="{ row }">
					<span>{{ format(row.create_time) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="财务利润率">
				<template #default="{ row }">
					<span>{{ round(row.res.financialProfitMargins * 100, 2) }}</span>
					<span> %</span>
					<span>{{ " (" + row.res.financialProfitTarget * 100 + "%)" }}</span>
				</template>
			</el-table-column>
			<el-table-column label="业务利润率">
				<template #default="{ row }">
					<span>{{ round(row.res.businessProfitMargins * 100, 2) }}</span>
					<span> %</span>
					<span>{{ " (" + row.res.businessProfitTarget * 100 + "%)" }}</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination_container">
			<el-pagination
				v-model:current-page="pageNum"
				v-model:page-size="page"
				layout="prev, pager, next, sizes, total"
				:page-sizes="[10, 20, 50, 100]"
				:total="total"
				@size-change="sizeChangeHandler"
				@current-change="currentChangeHandler"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.front-log {
		.expand {
			display: flex;
			flex-direction: column;
			gap: 5px;
			padding: 10px 30px;
		}
		.pagination_container {
			padding-top: 10px;
		}
	}
</style>
