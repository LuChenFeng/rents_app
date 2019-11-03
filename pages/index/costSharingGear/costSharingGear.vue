<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<view class="uni-flex uni-column  columnBelowList1">
			<view class="flex-item flex-item-V mytitle">分配方式</view>
			<radio-group class="flex-item flex-item-V mycontent">
				<radio value="type1" checked="true" style="width: 50%;" @tap="togglePopup('showOutTips', 'tip')">按出差比例分</radio>
				<radio value="type2" style="width: 50%;">自定义例分</radio>
			</radio-group>
		</view>

		<!-- 每月固定费用 -->
		<view class="uni-flex uni-column  columnBelowList1" style="height: auto;">
			<view class="flex-item flex-item-V mytitle">每月固定费用<text class="myTitleSon">\n按人头均分/不参与比例，建议每项费用为费用总额</text></view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in fixedList" :key="key">
					<view class="flex-item flex-item-V  columnBelowListView">
						<view>{{value.title}}</view>
						<input class="uni-input " name="price" type="number" placeholder="元/月" style="width:50%;" :value="value.price"
						 :id="key" @blur="inputListFixed" />
						<button class="delbtn" @tap="togglePopup('centerChangeDel', 'tip','fixedList',key)">删除</button>
					</view>
				</view>

			</view>
			<button @click="togglePopup('centerAdd','tip')" class="addbtn">点击这里再加一行数据</button>
			<uni-popup :show="showFixedAdd" :type="type" :custom="true" :mask-click="false" @change="change">
				<view class="uni-tip">
					<view class="uni-tip-title">请输入名称</view>
					<view class="uni-tip-content">
						<input maxlength="6" autocomplete="off" class="uni-input " placeholder="输入名字,最多6个字符" style="width:100%;  text-align: center;"
						 @blur="addInputName" />
					</view>
					<view class="uni-tip-group-button">
						<view class="uni-tip-button" @tap="cancel('yes','','fixeAdd')">确定</view>
					</view>
				</view>
			</uni-popup>
		</view>

		<!-- 每月不定费用 -->
		<view class="uni-flex uni-column  columnBelowList1" style="height: auto;">
			<view class="flex-item flex-item-V mytitle">每月不定费用<text class="myTitleSon">\n按比例分配，建议每项费用为费用总额</text></view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in changeList" :key="key">
					<view class="flex-item flex-item-V  columnBelowListView">
						<view>{{value.title}}</view>
						<input class="uni-input " name="price" type="number" placeholder="元/月" style="width:50%;" :value="value.price"
						 :id="key" @blur="inputListChange" />
						<button class="delbtn" @tap="togglePopup('centerChangeDel', 'tip','changeList',key)">删除</button>
					</view>

				</view>
			</view>
			<button @click="togglePopup('centerChangeAdd','tip')" class="addbtn">点击这里再加一行数据</button>
			<uni-popup :show="showChangeAdd" :type="type" :custom="true" :mask-click="false" @change="change">
				<view class="uni-tip">
					<view class="uni-tip-title">请输入名称</view>
					<view class="uni-tip-content">
						<input maxlength="6" autocomplete="off" class="uni-input " placeholder="输入名字,最多6个字符" style="width:100%; text-align: center;"
						 @blur="addInputName" />
					</view>
					<view class="uni-tip-group-button">
						<view class="uni-tip-button" @tap="cancel('yes','','changeAdd')">确定</view>
					</view>
				</view>
			</uni-popup>
		</view>

		<!-- 每月清算日子 -->
		<view class="uni-flex uni-column  columnBelowList1" style="height: auto;">
			<view class="flex-item flex-item-V mytitle">每月结算</view>
				<view @click="showSinglePicker">点击修改：在每月的<text class="selectDay">{{pickerText}}</text>号结算</view>
		</view>
		
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>


		<!-- 删除提示框 -->
		<uni-popup :show="showChangeDel" :type="type" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">删除后不可恢复，确认删除？</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="cancel('no')">取消</view>
					<view class="uni-tip-button" @tap="cancel('yes')">确定</view>
				</view>
			</view>
		</uni-popup>
		<!-- 点到出差单选时的提示框 -->
		<uni-popup :show="showOutTips" :type="type" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">提示</view>
				<view class="uni-tip-content">按出差比例划分，用户需要记录下自己的出差天数</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @tap="cancel('no')">我已知晓</view>
				</view>
			</view>
		</uni-popup>

		<button class="submitbtn" @tap="submit">保存</button>
	</view>
</template>

<script src="./costSharingGear.js"></script>

<style scoped>
	@import './costSharingGear.css';
</style>
