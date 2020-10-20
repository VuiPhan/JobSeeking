-- Create by: VuiPhan
-- Create date: 17-10-2020
-- Description: Lưu giữ những đoạn script update

USE [JobSeeking]
ALTER PROCEDURE [dbo].[UTE_Company_Register]
 @FullName nvarchar(500),
 @EmailAddress NVARCHAR(500),
 @PassWord NVARCHAR(500),
 @CompanyName NVARCHAR(500),
 @CompanyAddress NVARCHAR(500),
 @TimeWorking NVARCHAR(500),
 @ImageLogo NVARCHAR(200),
 @CompanyType TINYINT
AS
-- Nội dung tạo store để cho việc đăng ký tài khoản cho công ty đăng ký việc làm.
-- Create by: Vui Phan
-- Date created: 17-10-2020
--EXEC dbo.UTE_Company_Register @FullName = N'Phan Đăng Vui', -- nvarchar(500)
--    @EmailAddress = N'phanvui453@gmail.com', -- nvarchar(500)
--    @PassWord = N'123123123A', -- nvarchar(500)
--    @CompanyName = N'FPT Software', -- nvarchar(500)
--    @CompanyAddress = N'123 Hoàng Diệu 2', -- nvarchar(500)
--    @TimeWorking = N'Thứ 2 - Thứ 6. Từ 8h00 - 18h00', -- nvarchar(500)
--    @ImageLogo = N'' -- nvarchar(200)
BEGIN
	BEGIN TRAN

BEGIN TRY

	INSERT INTO dbo.UTEApp_Account
	        ( UserLogin, Password, Roles )
	VALUES  ( 
	          @EmailAddress, -- UserLogin - nvarchar(20)
	          @PassWord, -- Password - nvarchar(max)
	          1  -- Roles - nvarchar(20)
	          )

	INSERT INTO dbo.UTECom_Company
	        ( 
	          CompanyName ,
	          CompanyAddress ,
	          CompanyType ,
	          ImageLogo,
			  UserID
	        )
	VALUES  (  -- CompanyID - nvarchar(20)
	          @CompanyName , -- CompanyName - nvarchar(500)
	          @CompanyAddress , -- CompanyAddress - nvarchar(500)
	          @CompanyType, -- CompanyType - int
	          @ImageLogo,  -- Image - nvarchar(200)
			  scope_identity()
	        )



  COMMIT TRAN

END TRY
BEGIN CATCH
 SELECT   
        ERROR_NUMBER() AS ErrorNumber  
       ,ERROR_MESSAGE() AS ErrorMessage;
  ROLLBACK TRAN
 

END CATCH
END


-- Đăng tin tuyển dụng
alter PROCEDURE [dbo].[UTECompany_PublishedRecuit]
 @CompanyID int,
 @JobsTitle NVARCHAR(500),
 @JobDescriptions NVARCHAR(500),
 @JobRequirements NVARCHAR(500)
AS
-- Nội dung tạo store để cho việc đăng tin tuyển dụng 
-- Create by: Vui Phan
-- Date created: 20-10-2020
--EXEC dbo.UTECompany_PublishedRecuit 1,'JobsTitle','JobDescriptions','JobRequirements'
BEGIN
	BEGIN TRAN

BEGIN TRY

	INSERT INTO dbo.UTEWork_Jobs
	        (
	          CompanyID ,
	          ReasonsToJoin ,
	          JobsTitle ,
	          JobDescriptions ,
	          JobRequirements ,
	          LoveWorkingHere ,
	          PostingDate
	        )
	VALUES  (
	          @CompanyID , -- CompanyID - nvarchar(20)
	          N'' , -- ReasonsToJoin - nvarchar(1000)
	          @JobsTitle , -- JobsTitle - nvarchar(200)
	          @JobDescriptions , -- JobDescriptions - nvarchar(1000)
	          @JobRequirements , -- JobRequirements - nvarchar(1000)
	          N'' , -- LoveWorkingHere - nvarchar(1000)
	          GETDATE()  -- PostingDate - datetime
	        )
  COMMIT TRAN

END TRY
BEGIN CATCH
 SELECT   
        ERROR_NUMBER() AS ErrorNumber  
       ,ERROR_MESSAGE() AS ErrorMessage;
  ROLLBACK TRAN
 

END CATCH
END
GO 