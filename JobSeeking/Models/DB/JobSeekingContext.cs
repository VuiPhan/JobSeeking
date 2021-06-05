using System;
using JobSeeking.Common;
using JobSeeking.Models.Class;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace JobSeeking.Models.DB
{
    public partial class JobSeekingContext : DbContext
    {
        public JobSeekingContext()
        {
        }

        public JobSeekingContext(DbContextOptions<JobSeekingContext> options)
            : base(options)
        {
        }
        public DbSet<ValueList> ValueLists { get; set; }
        public DbSet<ValueListString> ValueListStrings { get; set; }
        public DbSet<FormJobSeeker> FormJobSeekers { get; set; }
        public DbSet<ShowTimeLine> ShowTimeLines { get; set; }
        public DbSet<TimeLineCandidate> TimeLineCandidates { get; set; }
        
        public DbSet<StatiscalViewProfile> StatiscalViewProfiles { get; set; }
        
        public DbSet<CompanyPage> CompanyPages { get; set; }
        public DbSet<FormHeaderCompany> FormHeaderCompanys { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<ReviewCompany> ReviewCompanys { get; set; }

        public DbSet<ListCandidateApply> ListCandidateApplys { get; set; }

        public DbSet<JobForm> JobForms { get; set; }
        public DbSet<RoundInterview> RoundInterviews { get; set; }
        public DbSet<CandidateOfRoundInterview> CandidateOfRoundInterviews { get; set; }
        
        public DbSet<ListCVOfCandidate> ListCVOfCandidates { get; set; }
        public DbSet<ListWorkProcessOfCandidate> ListWorkProcessOfCandidate { get; set; }
        public DbSet<ListCertificateOfCandidate> ListCertificateOfCandidates { get; set; }
        
        public DbSet<ListEducation> ListEducations { get; set; }
        
        public DbSet<WorkInfo> WorkInfos { get; set; }
        public DbSet<JobPage> JobPages { get; set; }

        public DbSet<ListCompanyTop> ListCompanyTops { get; set; }
        public DbSet<PublishedRecuitForm> PublishedRecuitForms { get; set; }
        public DbSet<CandidatePotential> CandidatePotentials { get; set; }
        public DbSet<TemplateOfEmail> TemplateOfEmails { get; set; }
        public DbSet<TemplateOfEmail_Admin> TemplateOfEmail_Admins { get; set; }
        public DbSet<ListNotificationForRecruit> ListNotificationForRecruits { get; set; }
        public DbSet<NumberViewDashboardCard> NumberViewDashboardCards { get; set; }
        public DbSet<NumberViewDashboardChart_Job> NumberViewDashboardChart_Jobs { get; set; }
        public DbSet<NumberViewDashboardChart_KyNang> NumberViewDashboardChart_KyNangs { get; set; }
        public DbSet<NumberViewDashboardChart_NhaTuyenDungAndUngVien> NumberViewDashboardChart_NhaTuyenDungAndUngViens { get; set; }

        public DbSet<Admin_InfomationCompany> Admin_InfomationCompanys { get; set; }
        public DbSet<ManagerCategories> ManagerCategoriess { get; set; }
        
        public virtual DbSet<UteappAccount> UteappAccounts { get; set; }
        public virtual DbSet<UteappAppCertificate> UteappAppCertificates { get; set; }
        public virtual DbSet<UteappAppEducation> UteappAppEducations { get; set; }
        public virtual DbSet<UteappAppSkill> UteappAppSkills { get; set; }
        public virtual DbSet<UteappAppWorkProgress> UteappAppWorkProgresses { get; set; }
        public virtual DbSet<UteappApplicant> UteappApplicants { get; set; }
        public virtual DbSet<UteappWork> UteappWorks { get; set; }
        public virtual DbSet<UtecomCompany> UtecomCompanies { get; set; }
        public virtual DbSet<UtecomReview> UtecomReviews { get; set; }
        public virtual DbSet<UtelsCertificate> UtelsCertificates { get; set; }
        public virtual DbSet<UtelsLevelTraining> UtelsLevelTrainings { get; set; }
        public virtual DbSet<UtelsMajor> UtelsMajors { get; set; }
        public virtual DbSet<UtelsProvince> UtelsProvinces { get; set; }
        public virtual DbSet<UtelsSkill> UtelsSkills { get; set; }
        public virtual DbSet<UtelsTag> UtelsTags { get; set; }
        public virtual DbSet<UtelsTrainingPlace> UtelsTrainingPlaces { get; set; }
        public virtual DbSet<UtelsTypeOfEducation> UtelsTypeOfEducations { get; set; }
        public virtual DbSet<UtesysComboboxList> UtesysComboboxLists { get; set; }
        public virtual DbSet<UtesysInformationDatabase> UtesysInformationDatabases { get; set; }
        public virtual DbSet<UtesysValuelist> UtesysValuelists { get; set; }
        public virtual DbSet<UteworkJob> UteworkJobs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
         .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
         .AddJsonFile("appsettings.json")
         .Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("JobSeekingDB"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ValueList>().HasNoKey();
            modelBuilder.Entity<ValueListString>().HasNoKey();
            modelBuilder.Entity<FormHeaderCompany>().HasNoKey();
            modelBuilder.Entity<FormJobSeeker>().HasNoKey();
            modelBuilder.Entity<ShowTimeLine>().HasNoKey();
            modelBuilder.Entity<CompanyPage>().HasNoKey();
            modelBuilder.Entity<UserLogin>().HasNoKey();
            modelBuilder.Entity<JobForm>().HasNoKey();
            modelBuilder.Entity<ListCVOfCandidate>().HasNoKey();
            modelBuilder.Entity<ReviewCompany>().HasNoKey();
            modelBuilder.Entity<ListCandidateApply>().HasNoKey();
            modelBuilder.Entity<WorkInfo>().HasNoKey();
            modelBuilder.Entity<JobPage>().HasNoKey();
            modelBuilder.Entity<PublishedRecuitForm>().HasNoKey();
            modelBuilder.Entity<ListCompanyTop>().HasNoKey();
            modelBuilder.Entity<ListWorkProcessOfCandidate>().HasNoKey();
            modelBuilder.Entity<ListCertificateOfCandidate>().HasNoKey();
            modelBuilder.Entity<ListEducation>().HasNoKey();
            modelBuilder.Entity<RoundInterview>().HasNoKey();
            modelBuilder.Entity<CandidateOfRoundInterview>().HasNoKey();
            modelBuilder.Entity<CandidatePotential>().HasNoKey();
            modelBuilder.Entity<TemplateOfEmail>().HasNoKey();
            modelBuilder.Entity<TemplateOfEmail_Admin>().HasNoKey();
            modelBuilder.Entity<ListNotificationForRecruit>().HasNoKey();
            modelBuilder.Entity<StatiscalViewProfile>().HasNoKey();
            modelBuilder.Entity<NumberViewDashboardCard>().HasNoKey();
            modelBuilder.Entity<NumberViewDashboardChart_Job>().HasNoKey();
            modelBuilder.Entity<NumberViewDashboardChart_KyNang>().HasNoKey();
            modelBuilder.Entity<NumberViewDashboardChart_NhaTuyenDungAndUngVien>().HasNoKey();
            modelBuilder.Entity<Admin_InfomationCompany>().HasNoKey();
            modelBuilder.Entity<ManagerCategories>().HasNoKey();
            modelBuilder.Entity<TimeLineCandidate>().HasNoKey();
            


            modelBuilder.Entity<UteappAccount>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_UTEApp_Account_1");

                entity.ToTable("UTEApp_Account");

                entity.HasIndex(e => e.UserLogin)
                    .HasName("UQ__UTEApp_A__7F8E8D5E5133C39E")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Roles).HasMaxLength(20);

                entity.Property(e => e.UserLogin).HasMaxLength(200);
            });

            modelBuilder.Entity<UteappAppCertificate>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCode, e.CertificateId });

                entity.ToTable("UTEAPP_AppCertificate");

                entity.Property(e => e.CertificateId)
                    .HasColumnName("CertificateID")
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.HasOne(d => d.CandidateCodeNavigation)
                    .WithMany(p => p.UteappAppCertificates)
                    .HasForeignKey(d => d.CandidateCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppCertificate_UTEAPP_Applicant");

                entity.HasOne(d => d.Certificate)
                    .WithMany(p => p.UteappAppCertificates)
                    .HasForeignKey(d => d.CertificateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppCertificate_UTELS_Certificate");
            });

            modelBuilder.Entity<UteappAppEducation>(entity =>
            {
                entity.HasKey(e => e.CandidateCode)
                    .HasName("PK_UTEAPP_AppEducation_1");

                entity.ToTable("UTEAPP_AppEducation");

                entity.Property(e => e.CandidateCode).ValueGeneratedNever();

                entity.Property(e => e.LevelTrainingId)
                    .IsRequired()
                    .HasColumnName("LevelTrainingID")
                    .HasMaxLength(10);

                entity.Property(e => e.MajorsId)
                    .HasColumnName("MajorsID")
                    .HasMaxLength(10);

                entity.Property(e => e.MoreInformation).HasMaxLength(600);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.TrainingPlacesId)
                    .HasColumnName("TrainingPlacesID")
                    .HasMaxLength(10);

                entity.Property(e => e.TypeOfEducationId)
                    .HasColumnName("TypeOfEducationID")
                    .HasMaxLength(10);

                entity.HasOne(d => d.CandidateCodeNavigation)
                    .WithOne(p => p.UteappAppEducation)
                    .HasForeignKey<UteappAppEducation>(d => d.CandidateCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppEducation_UTEAPP_Applicant");

                entity.HasOne(d => d.LevelTraining)
                    .WithMany(p => p.UteappAppEducations)
                    .HasForeignKey(d => d.LevelTrainingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppEducation_UTELS_LevelTraining");

                entity.HasOne(d => d.LevelTrainingNavigation)
                    .WithMany(p => p.UteappAppEducations)
                    .HasForeignKey(d => d.LevelTrainingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppEducation_UTELS_TrainingPlaces");

                entity.HasOne(d => d.Majors)
                    .WithMany(p => p.UteappAppEducations)
                    .HasForeignKey(d => d.MajorsId)
                    .HasConstraintName("FK_UTEAPP_AppEducation_UTELS_Majors");

                entity.HasOne(d => d.TypeOfEducation)
                    .WithMany(p => p.UteappAppEducations)
                    .HasForeignKey(d => d.TypeOfEducationId)
                    .HasConstraintName("FK_UTEAPP_AppEducation_UTELS_TypeOfEducation");
            });

            modelBuilder.Entity<UteappAppSkill>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCode, e.SkillId })
                    .HasName("PK_UTEAPP_AppSkillAndCertification");

                entity.ToTable("UTEAPP_AppSkills");

                entity.Property(e => e.SkillId)
                    .HasColumnName("SkillID")
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.Notes).HasMaxLength(200);

                entity.Property(e => e.Notes2).HasMaxLength(200);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.HasOne(d => d.CandidateCodeNavigation)
                    .WithMany(p => p.UteappAppSkills)
                    .HasForeignKey(d => d.CandidateCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppSkills_UTEAPP_Applicant");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.UteappAppSkills)
                    .HasForeignKey(d => d.SkillId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppSkills_UTELS_Skills");
            });

            modelBuilder.Entity<UteappAppWorkProgress>(entity =>
            {
                entity.HasKey(e => e.CandidateCode);

                entity.ToTable("UTEAPP_AppWorkProgress");

                entity.Property(e => e.CandidateCode).ValueGeneratedNever();

                entity.Property(e => e.FromDate).HasColumnType("datetime");

                entity.Property(e => e.JobName).HasMaxLength(200);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.RecruitmentAgencyId)
                    .HasColumnName("RecruitmentAgencyID")
                    .HasMaxLength(20);

                entity.Property(e => e.ToDate).HasColumnType("datetime");

                entity.HasOne(d => d.CandidateCodeNavigation)
                    .WithOne(p => p.UteappAppWorkProgress)
                    .HasForeignKey<UteappAppWorkProgress>(d => d.CandidateCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_AppWorkProgress_UTEAPP_Applicant");
            });

            modelBuilder.Entity<UteappApplicant>(entity =>
            {
                entity.HasKey(e => e.CandidateCode);

                entity.ToTable("UTEAPP_Applicant");

                entity.Property(e => e.AcademicLevelId).HasColumnName("AcademicLevelID");

                entity.Property(e => e.AliasesName).HasMaxLength(50);

                entity.Property(e => e.Birthday).HasColumnType("datetime");

                entity.Property(e => e.DateRange).HasColumnType("datetime");

                entity.Property(e => e.EducationalLevelId)
                    .HasColumnName("EducationalLevelID")
                    .HasMaxLength(10);

                entity.Property(e => e.EmailAddress).HasMaxLength(20);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.FormsOfTrainingId)
                    .HasColumnName("FormsOfTrainingID")
                    .HasMaxLength(10);

                entity.Property(e => e.GenderId).HasColumnName("GenderID");

                entity.Property(e => e.IdentityCardNo).HasMaxLength(10);

                entity.Property(e => e.IssuedBy).HasColumnType("datetime");

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PathAvatar).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(10);

                entity.Property(e => e.SpecialTraces).HasMaxLength(200);

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UteappWork>(entity =>
            {
                entity.HasKey(e => e.RecId);

                entity.ToTable("UTEAPP_Work");

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.JobId).HasColumnName("JobID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.CandidateCodeNavigation)
                    .WithMany(p => p.UteappWorks)
                    .HasForeignKey(d => d.CandidateCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_Work_UTEAPP_AppEducation");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UteappWorks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEAPP_Work_UTEApp_Account");
            });

            modelBuilder.Entity<UtecomCompany>(entity =>
            {
                entity.HasKey(e => e.CompanyId);

                entity.ToTable("UTECom_Company");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.CompanyAddress).HasMaxLength(500);

                entity.Property(e => e.CompanyName).HasMaxLength(500);

                entity.Property(e => e.Image1).HasMaxLength(200);

                entity.Property(e => e.Image2).HasMaxLength(200);

                entity.Property(e => e.Image3).HasMaxLength(200);

                entity.Property(e => e.ImageLogo).HasMaxLength(200);

                entity.Property(e => e.LocationProvince).HasMaxLength(50);

                entity.Property(e => e.ScalePeople).HasMaxLength(50);

                entity.Property(e => e.TimeWorking).HasMaxLength(500);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UtecomCompanies)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UTECom_Company_UTEApp_Account");
            });

            modelBuilder.Entity<UtecomReview>(entity =>
            {
                entity.HasKey(e => e.RecId);

                entity.ToTable("UTECom_Review");

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.DateReview).HasColumnType("datetime");

                entity.Property(e => e.Ilike)
                    .HasColumnName("ILike")
                    .HasMaxLength(500);

                entity.Property(e => e.Improve).HasMaxLength(500);

                entity.Property(e => e.TitleReview).HasMaxLength(500);

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UtelsCertificate>(entity =>
            {
                entity.HasKey(e => e.CertificateId);

                entity.ToTable("UTELS_Certificate");

                entity.Property(e => e.CertificateId)
                    .HasColumnName("CertificateID")
                    .HasMaxLength(10);

                entity.Property(e => e.CertificateName).HasMaxLength(200);

                entity.Property(e => e.CertificateName2).HasMaxLength(200);

                entity.Property(e => e.Notes).HasMaxLength(200);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsLevelTraining>(entity =>
            {
                entity.HasKey(e => e.LevelTrainingId);

                entity.ToTable("UTELS_LevelTraining");

                entity.Property(e => e.LevelTrainingId)
                    .HasColumnName("LevelTrainingID")
                    .HasMaxLength(10);

                entity.Property(e => e.LevelTrainingName).HasMaxLength(200);

                entity.Property(e => e.LevelTrainingName2).HasMaxLength(200);

                entity.Property(e => e.Notes).HasMaxLength(200);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsMajor>(entity =>
            {
                entity.HasKey(e => e.MajorsId);

                entity.ToTable("UTELS_Majors");

                entity.Property(e => e.MajorsId)
                    .HasColumnName("MajorsID")
                    .HasMaxLength(10);

                entity.Property(e => e.MajorsName).HasMaxLength(200);

                entity.Property(e => e.MajorsName2).HasMaxLength(200);

                entity.Property(e => e.Notes).HasMaxLength(200);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsProvince>(entity =>
            {
                entity.HasKey(e => e.ProvinceId);

                entity.ToTable("UTELS_Province");

                entity.Property(e => e.ProvinceId).HasColumnName("ProvinceID");

                entity.Property(e => e.ProvinceName).HasMaxLength(200);

                entity.Property(e => e.ProvinceName2).HasMaxLength(200);
            });

            modelBuilder.Entity<UtelsSkill>(entity =>
            {
                entity.HasKey(e => e.SkillId);

                entity.ToTable("UTELS_Skills");

                entity.Property(e => e.SkillId)
                    .HasColumnName("SkillID")
                    .HasMaxLength(10);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.SkillName).HasMaxLength(200);

                entity.Property(e => e.SkillName2).HasMaxLength(200);
            });

            modelBuilder.Entity<UtelsTag>(entity =>
            {
                entity.HasKey(e => e.TagId);

                entity.ToTable("UTELS_Tag");

                entity.Property(e => e.TagId).HasColumnName("TagID");

                entity.Property(e => e.TagName).HasMaxLength(50);
            });

            modelBuilder.Entity<UtelsTrainingPlace>(entity =>
            {
                entity.HasKey(e => e.TrainingPlacesId);

                entity.ToTable("UTELS_TrainingPlaces");

                entity.Property(e => e.TrainingPlacesId)
                    .HasColumnName("TrainingPlacesID")
                    .HasMaxLength(10);

                entity.Property(e => e.Notes).HasMaxLength(200);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.TrainingPlacesName).HasMaxLength(200);

                entity.Property(e => e.TrainingPlacesName2).HasMaxLength(200);
            });

            modelBuilder.Entity<UtelsTypeOfEducation>(entity =>
            {
                entity.HasKey(e => e.TypeOfEducationId);

                entity.ToTable("UTELS_TypeOfEducation");

                entity.Property(e => e.TypeOfEducationId)
                    .HasColumnName("TypeOfEducationID")
                    .HasMaxLength(10);

                entity.Property(e => e.Notes).HasMaxLength(500);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.TypeOfEducationName).HasMaxLength(200);

                entity.Property(e => e.TypeOfEducationName2).HasMaxLength(200);
            });

            modelBuilder.Entity<UtesysComboboxList>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UTESYS_ComboboxList");

                entity.Property(e => e.ColumName1).HasMaxLength(50);

                entity.Property(e => e.ColumName2).HasMaxLength(50);

                entity.Property(e => e.ComboxName).HasMaxLength(50);

                entity.Property(e => e.Language).HasMaxLength(2);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.TableName).HasMaxLength(50);
            });

            modelBuilder.Entity<UtesysInformationDatabase>(entity =>
            {
                entity.HasKey(e => e.RecId);

                entity.ToTable("UTESYS_InformationDatabase");

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.TableName).HasMaxLength(50);
            });

            modelBuilder.Entity<UtesysValuelist>(entity =>
            {
                entity.HasKey(e => e.NameValueList);

                entity.ToTable("UTESYS_Valuelist");

                entity.Property(e => e.NameValueList).HasMaxLength(50);

                entity.Property(e => e.CustomValue).HasMaxLength(500);

                entity.Property(e => e.DefaultValue).HasMaxLength(500);

                entity.Property(e => e.Language).HasMaxLength(2);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UteworkJob>(entity =>
            {
                entity.HasKey(e => e.JobId);

                entity.ToTable("UTEWork_Jobs");

                entity.Property(e => e.JobId).HasColumnName("JobID");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.ImageJob).HasMaxLength(200);

                entity.Property(e => e.JobDescriptions).HasMaxLength(1000);

                entity.Property(e => e.JobRequirements).HasMaxLength(1000);

                entity.Property(e => e.JobsTitle).HasMaxLength(200);

                entity.Property(e => e.LoveWorkingHere).HasMaxLength(1000);

                entity.Property(e => e.Otmode)
                    .HasColumnName("OTMode")
                    .HasMaxLength(200);

                entity.Property(e => e.PostingDate).HasColumnType("datetime");

                entity.Property(e => e.PriorityDegree).HasMaxLength(100);

                entity.Property(e => e.ReasonsToJoin).HasMaxLength(1000);

                entity.Property(e => e.Strengths).HasMaxLength(100);

                entity.Property(e => e.WorkLocation).HasMaxLength(200);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.UteworkJobs)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UTEWork_Jobs_UTECom_Company");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
