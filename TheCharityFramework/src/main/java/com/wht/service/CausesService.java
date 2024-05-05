package com.wht.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Causes;
import com.wht.domain.vo.DaysCausesVo;

import java.util.List;


/**
 * Charity project表(Causes)表服务接口
 *
 * @author makejava
 * @since 2022-04-18 20:41:14
 */
public interface CausesService extends IService<Causes> {
    //获取近期Charity project
    ResponseEntity<List<Causes>> getRecentlyCauses();
    //获取Characteristic public welfare
    ResponseEntity<List<Causes>> getFeatureCauses();
    //获取正在进行的项目
    ResponseEntity<List<Causes>> getGoingCauses();
    //获取热门公益
    ResponseEntity<List<Causes>> getHotCauses();
    //获取已经筹集的资金数
    ResponseEntity<Integer> getRaisedMoney();
    //获取completed  活动数
    ResponseEntity<Integer> getFinishedCauseNum();
    //分页searchCharity project并返回分页对象
    ResponseEntity<Page<Causes>> getCausesPage(Integer pageNum, Integer pageSize, String keyword);
    //获取近日筹集资金数
    ResponseEntity<List<DaysCausesVo>> getDaysCharityData();
    //获取最近6个慈善活动
    ResponseEntity<List<Causes>> getCauseProgress();
}
