using JobSeeking.Models.Class;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

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
        public DbSet<FormJobSeeker> FormJobSeekers { get; set; }
        public DbSet<CompanyPage> CompanyPages { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<ReviewCompany> ReviewCompanys { get; set; }

        public DbSet<JobForm> JobForms { get; set; }
        public virtual DbSet<UteappAccount> UteappAccounts { get; set; }
        public virtual DbSet<UteappAppCertificate> UteappAppCertificates { get; set; }
        public virtual DbSet<UteappAppEducation> UteappAppEducations { get; set; }
        public virtual DbSet<UteappAppSkill> UteappAppSkills { get; set; }
        public virtual DbSet<UteappAppWorkProgress> UteappAppWorkProgresses { get; set; }
        public virtual DbSet<UteappApplicant> UteappApplicants { get; set; }
        public virtual DbSet<UteappJobInformation> UteappJobInformations { get; set; }
        public virtual DbSet<UtecomCompany> UtecomCompanies { get; set; }
        public virtual DbSet<UtelsAcademicLevel> UtelsAcademicLevels { get; set; }
        public virtual DbSet<UtelsCertificate> UtelsCertificates { get; set; }
        public virtual DbSet<UtelsEducationalLevel> UtelsEducationalLevels { get; set; }
        public virtual DbSet<UtelsFormsOfTraining> UtelsFormsOfTrainings { get; set; }
        public virtual DbSet<UtelsGender> UtelsGenders { get; set; }
        public virtual DbSet<UtelsJobStatu> UtelsJobStatus { get; set; }
        public virtual DbSet<UtelsLevelTraining> UtelsLevelTrainings { get; set; }
        public virtual DbSet<UtelsMajor> UtelsMajors { get; set; }
        public virtual DbSet<UtelsMaritalStatu> UtelsMaritalStatus { get; set; }
        public virtual DbSet<UtelsSkill> UtelsSkills { get; set; }
        public virtual DbSet<UtelsTrainingPlace> UtelsTrainingPlaces { get; set; }
        public virtual DbSet<UtelsTypeOfEducation> UtelsTypeOfEducations { get; set; }
        public virtual DbSet<UtelsTypeOfLabor> UtelsTypeOfLabors { get; set; }
        public virtual DbSet<UtesysComboboxList> UtesysComboboxLists { get; set; }
        public virtual DbSet<UtesysInformationDatabase> UtesysInformationDatabases { get; set; }
        public virtual DbSet<UtesysValuelist> UtesysValuelists { get; set; }
        public virtual DbSet<UteworkJob> UteworkJobs { get; set; }
        public virtual DbSet<FormHeaderCompany> FormHeaderCompanys { get; set; }

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
            modelBuilder.Entity<FormHeaderCompany>().HasNoKey();
            modelBuilder.Entity<FormJobSeeker>().HasNoKey();
            modelBuilder.Entity<CompanyPage>().HasNoKey();
            modelBuilder.Entity<UserLogin>().HasNoKey();
            modelBuilder.Entity<JobForm>().HasNoKey();
            modelBuilder.Entity<ReviewCompany>().HasNoKey(); 
            modelBuilder.Entity<UteappAccount>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_UTEApp_Account_1");

                entity.ToTable("UTEApp_Account");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Roles).HasMaxLength(20);

                entity.Property(e => e.UserLogin).HasMaxLength(20);
            });

            modelBuilder.Entity<UteappAppCertificate>(entity =>
            {
                entity.HasKey(e => new { e.CandidateCode, e.CertificateId });

                entity.ToTable("UTEAPP_AppCertificate");

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

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
                entity.HasKey(e => new { e.CandidateCode, e.LevelTrainingId })
                    .HasName("PK_UTEApp_AppEducation");

                entity.ToTable("UTEAPP_AppEducation");

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

                entity.Property(e => e.LevelTrainingId)
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
                    .WithMany(p => p.UteappAppEducations)
                    .HasForeignKey(d => d.CandidateCode)
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

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

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

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

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

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

                entity.Property(e => e.AcademicLevelId)
                    .HasColumnName("AcademicLevelID")
                    .HasMaxLength(10);

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

                entity.Property(e => e.GenderId)
                    .HasColumnName("GenderID")
                    .HasMaxLength(10);

                entity.Property(e => e.Health).HasMaxLength(10);

                entity.Property(e => e.IdentityCardNo).HasMaxLength(10);

                entity.Property(e => e.IssuedBy).HasColumnType("datetime");

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.MaritalStatusId)
                    .HasColumnName("MaritalStatusID")
                    .HasMaxLength(10);

                entity.Property(e => e.PathAvatar).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(10);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.SpecialTraces).HasMaxLength(200);

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasMaxLength(20);

                entity.HasOne(d => d.AcademicLevel)
                    .WithMany(p => p.UteappApplicants)
                    .HasForeignKey(d => d.AcademicLevelId)
                    .HasConstraintName("FK_UTEAPP_Applicant_UTELS_AcademicLevel");

                entity.HasOne(d => d.EducationalLevel)
                    .WithMany(p => p.UteappApplicants)
                    .HasForeignKey(d => d.EducationalLevelId)
                    .HasConstraintName("FK_UTEAPP_Applicant_UTELS_EducationalLevel");

                entity.HasOne(d => d.FormsOfTraining)
                    .WithMany(p => p.UteappApplicants)
                    .HasForeignKey(d => d.FormsOfTrainingId)
                    .HasConstraintName("FK_UTEAPP_Applicant_UTELS_FormsOfTraining");

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.UteappApplicants)
                    .HasForeignKey(d => d.GenderId)
                    .HasConstraintName("FK_UTEAPP_Applicant_UTELS_Gender");

                entity.HasOne(d => d.MaritalStatus)
                    .WithMany(p => p.UteappApplicants)
                    .HasForeignKey(d => d.MaritalStatusId)
                    .HasConstraintName("FK_UTEAPP_Applicant_UTELS_MaritalStatus");
            });

            modelBuilder.Entity<UteappJobInformation>(entity =>
            {
                entity.HasKey(e => e.CandidateCode);

                entity.ToTable("UTEAPP_JobInformation");

                entity.Property(e => e.CandidateCode).HasMaxLength(20);

                entity.Property(e => e.JobStatusId)
                    .HasColumnName("JobStatusID")
                    .HasMaxLength(10);

                entity.Property(e => e.RecId).HasColumnName("RecID");

                entity.Property(e => e.RegistrationDate).HasColumnType("datetime");

                entity.Property(e => e.TypeOfLaborId)
                    .HasColumnName("TypeOfLaborID")
                    .HasMaxLength(10);

                entity.HasOne(d => d.JobStatus)
                    .WithMany(p => p.UteappJobInformations)
                    .HasForeignKey(d => d.JobStatusId)
                    .HasConstraintName("FK_UTEAPP_JobInformation_UTELS_JobStatus");

                entity.HasOne(d => d.TypeOfLabor)
                    .WithMany(p => p.UteappJobInformations)
                    .HasForeignKey(d => d.TypeOfLaborId)
                    .HasConstraintName("FK_UTEAPP_JobInformation_UTELS_TypeOfLabor");
            });

            modelBuilder.Entity<UtecomCompany>(entity =>
            {
                entity.HasKey(e => e.CompanyId);

                entity.ToTable("UTECom_Company");

                entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

                entity.Property(e => e.CompanyAddress).HasMaxLength(500);

                entity.Property(e => e.CompanyName).HasMaxLength(500);

                entity.Property(e => e.ImageLogo).HasMaxLength(200);

                entity.Property(e => e.TimeWorking).HasMaxLength(500);

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<UtelsAcademicLevel>(entity =>
            {
                entity.HasKey(e => e.AcademicLevelId);

                entity.ToTable("UTELS_AcademicLevel");

                entity.Property(e => e.AcademicLevelId)
                    .HasColumnName("AcademicLevelID")
                    .HasMaxLength(10);

                entity.Property(e => e.AcademicLevelName).HasMaxLength(50);

                entity.Property(e => e.AcademicLevelName2).HasMaxLength(50);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
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

            modelBuilder.Entity<UtelsEducationalLevel>(entity =>
            {
                entity.HasKey(e => e.EducationalLevelId);

                entity.ToTable("UTELS_EducationalLevel");

                entity.Property(e => e.EducationalLevelId)
                    .HasColumnName("EducationalLevelID")
                    .HasMaxLength(10);

                entity.Property(e => e.EducationalLevelName).HasMaxLength(50);

                entity.Property(e => e.EducationalLevelName2).HasMaxLength(50);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsFormsOfTraining>(entity =>
            {
                entity.HasKey(e => e.FormsOfTrainingId);

                entity.ToTable("UTELS_FormsOfTraining");

                entity.Property(e => e.FormsOfTrainingId)
                    .HasColumnName("FormsOfTrainingID")
                    .HasMaxLength(10);

                entity.Property(e => e.FormsOfTrainingName).HasMaxLength(50);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsGender>(entity =>
            {
                entity.HasKey(e => e.GenderId);

                entity.ToTable("UTELS_Gender");

                entity.Property(e => e.GenderId)
                    .HasColumnName("GenderID")
                    .HasMaxLength(10);

                entity.Property(e => e.GenderName).HasMaxLength(50);

                entity.Property(e => e.GenderName2).HasMaxLength(50);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<UtelsJobStatu>(entity =>
            {
                entity.HasKey(e => e.JobStatusId);

                entity.ToTable("UTELS_JobStatus");

                entity.Property(e => e.JobStatusId)
                    .HasColumnName("JobStatusID")
                    .HasMaxLength(10);

                entity.Property(e => e.JobStatusName).HasMaxLength(50);

                entity.Property(e => e.JobStatusName2).HasMaxLength(50);

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

            modelBuilder.Entity<UtelsMaritalStatu>(entity =>
            {
                entity.HasKey(e => e.MaritalStatusId);

                entity.ToTable("UTELS_MaritalStatus");

                entity.Property(e => e.MaritalStatusId)
                    .HasColumnName("MaritalStatusID")
                    .HasMaxLength(10);

                entity.Property(e => e.MaritalStatusName).HasMaxLength(50);

                entity.Property(e => e.MaritalStatusName2).HasMaxLength(50);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
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

            modelBuilder.Entity<UtelsTypeOfLabor>(entity =>
            {
                entity.HasKey(e => e.TypeOfLaborId);

                entity.ToTable("UTELS_TypeOfLabor");

                entity.Property(e => e.TypeOfLaborId)
                    .HasColumnName("TypeOfLaborID")
                    .HasMaxLength(10);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.TypeOfLaborName).HasMaxLength(50);

                entity.Property(e => e.TypeOfLaborName2).HasMaxLength(50);
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

                entity.Property(e => e.JobId)
                    .HasColumnName("JobID")
                    .ValueGeneratedNever();

                entity.Property(e => e.CompanyId)
                    .IsRequired()
                    .HasColumnName("CompanyID")
                    .HasMaxLength(20);

                entity.Property(e => e.JobDescriptions).HasMaxLength(1000);

                entity.Property(e => e.JobRequirements).HasMaxLength(1000);

                entity.Property(e => e.JobsTitle).HasMaxLength(200);

                entity.Property(e => e.LoveWorkingHere).HasMaxLength(1000);

                entity.Property(e => e.PostingDate).HasColumnType("datetime");

                entity.Property(e => e.ReasonsToJoin).HasMaxLength(1000);

                entity.Property(e => e.RecId)
                    .HasColumnName("RecID")
                    .ValueGeneratedOnAdd();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
