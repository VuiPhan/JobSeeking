using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using JobSeeking.Models.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;

namespace JobSeeking.Controllers.AdminPage
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly JobSeekingContext _context;
        public DashboardController(JobSeekingContext context)
        {
            _context = context;
        }
        [HttpGet("Statistics_ViewDashboardCard")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> Statistics_ViewDashboardCard()
        {
            List<NumberViewDashboardCard> numberViewDashboardCard = new List<NumberViewDashboardCard>();
            try
            {
                numberViewDashboardCard = await _context.NumberViewDashboardCards.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboardCard").ToListAsync();
            }
            catch (Exception e)
            {

            }
            return numberViewDashboardCard;
        }
        [HttpGet("Statistics_ViewDashboard_Chart")]
        [Authorize(Policy = Policies.Admin)]
        public async Task<object> Statistics_ViewDashboard_Chart(DateTime? fromTime,DateTime? toTime)
        {
            List<NumberViewDashboardChart_Job> numberViewDashboardChart = new List<NumberViewDashboardChart_Job>();
            List<NumberViewDashboardChart_KyNang> numberViewDashboardChart_KyNang = new List<NumberViewDashboardChart_KyNang>();
            List<NumberViewDashboardChart_KyNang> numberViewDashboardChart_ChucDanh = new List<NumberViewDashboardChart_KyNang>();
            List<NumberViewDashboardChart_NhaTuyenDungAndUngVien> numberViewDashboardChart_NhaTuyenDungAndUngVien = new List<NumberViewDashboardChart_NhaTuyenDungAndUngVien>();
            List<NumberViewDashboardChart_NhaTuyenDungAndUngVien> numberViewDashboardChart_NhaTuyenDungAndThanhToan = new List<NumberViewDashboardChart_NhaTuyenDungAndUngVien>();

            try
            {
                numberViewDashboardChart = await _context.NumberViewDashboardChart_Jobs.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboard_Chart_TinTuyenDung {0},{1}", fromTime,toTime).ToListAsync();
                numberViewDashboardChart_KyNang = await _context.NumberViewDashboardChart_KyNangs.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboard_Chart_KyNang {0},{1}", fromTime, toTime).ToListAsync();
                numberViewDashboardChart_ChucDanh = await _context.NumberViewDashboardChart_KyNangs.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboard_Chart_ChucDanh {0},{1}", fromTime, toTime).ToListAsync();
                numberViewDashboardChart_NhaTuyenDungAndUngVien = await _context.NumberViewDashboardChart_NhaTuyenDungAndUngViens.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboard_Chart_NhaTuyenDungAndUngVien {0},{1}", fromTime, toTime).ToListAsync();
                numberViewDashboardChart_NhaTuyenDungAndThanhToan = await _context.NumberViewDashboardChart_NhaTuyenDungAndUngViens.FromSqlRaw("EXEC dbo.UTE_SYS_Statistics_ViewDashboard_Chart_NhaTuyenDungAndThanhToan {0},{1}", fromTime, toTime).ToListAsync();
            }
            catch (Exception e)
            {

            }
            string[] Months = numberViewDashboardChart.Select(x => x.YYYYMM).ToArray();
            int?[] numberJob = numberViewDashboardChart.Select(x => x.NumberJob).ToArray();

            string[] SkillName = numberViewDashboardChart_KyNang.Select(x => x.SkillName).ToArray();
            int?[] numberJobSkill = numberViewDashboardChart_KyNang.Select(x => x.NumberJob).ToArray();

            string[] ChucDanh = numberViewDashboardChart_ChucDanh.Select(x => x.SkillName).ToArray();
            int?[] numberChucDanh = numberViewDashboardChart_ChucDanh.Select(x => x.NumberJob).ToArray();

            string[] YYYYMM_UngVienVaTuyenDung = numberViewDashboardChart_NhaTuyenDungAndUngVien.Where(x => x.Type == 1).Select(x => x.YYYYMM).ToArray();
            int?[] number_UngVien = numberViewDashboardChart_NhaTuyenDungAndUngVien.Where(x => x.Type == 1).Select(x => x.SL).ToArray();

            int?[] number_NhaTuyenDung = numberViewDashboardChart_NhaTuyenDungAndUngVien.Where(x => x.Type == 2).Select(x => x.SL).ToArray();


            int?[] number_LuotThanhToan = numberViewDashboardChart_NhaTuyenDungAndThanhToan.Where(x => x.Type == 1).Select(x => x.SL).ToArray();

            int?[] number_SoTienThanhToan = numberViewDashboardChart_NhaTuyenDungAndThanhToan.Where(x => x.Type == 2).Select(x => x.SL).ToArray();

            var dataFinal = new ArrayList()
                {
                Months, 
                numberJob,
                SkillName,
                numberJobSkill,
                ChucDanh,
                numberChucDanh,
                YYYYMM_UngVienVaTuyenDung,
                number_UngVien,
                number_NhaTuyenDung,
                number_LuotThanhToan,
                number_SoTienThanhToan
                };
            return dataFinal;
        }
    }
}
